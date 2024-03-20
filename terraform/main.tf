terraform {
  cloud {
    organization = "founding-pathers-fyp"
    workspaces {
      name = "fyp-workspace"
    }
  }
}

resource "aws_vpc" "FoundingPathersVPC" {
    cidr_block = var.cidr_block
    tags = {
        "Name" = "FoundingPathersVPC"
    }
    tags_all = {
        "Name" = "FoundingPathersVPC"
    }
}

resource "aws_alb" "app_load_balancer" {
    name = "founding-pathers-ALB"
    internal = false
    load_balancer_type = "application"
    security_groups = var.alb_security_group_values
    enable_deletion_protection = true
    subnets = var.subnet_values
}

resource "aws_ecs_cluster" "ur_active_cluster" {
    name = "UR-Active-Cluster"
    
    setting {
        name = "containerInsights"
        value = "disabled"
    }

    configuration {
        execute_command_configuration {
            logging = "DEFAULT"
        }
    }
}

data "aws_ssm_parameter" "ecs_task_definition" {
    name = "/foundingpathers-task-revision-terraform.json"
}

resource "aws_ecs_task_definition" "founding_pathers" {
    family = "foundingpathers-task"
    container_definitions = data.aws_ssm_parameter.ecs_task_definition.value
    execution_role_arn = var.ecs_iam_arn
    task_role_arn = var.ecs_iam_arn
    network_mode = "bridge"
    volume {
      name = "mongo-data"
    }
    cpu = var.ecs_cpu
    memory = var.ecs_memory
    requires_compatibilities = [ "EC2" ]
    runtime_platform {
        cpu_architecture = "X86_64"
        operating_system_family = "LINUX"
    }
}

data "aws_ami" "linux" {
    most_recent = true
    filter {
    name   = "name"
    values = ["al2023-ami-ecs-hvm-2023.0.20240312-kernel-6.1-x86_64"]
    }

    filter {
    name   = "virtualization-type"
    values = ["hvm"]
    }

    filter {
    name   = "root-device-type"
    values = ["ebs"]
    }

    owners = ["591542846629"] # Canonical
}

resource "aws_launch_template" "ecs_asg_template" {
    image_id = data.aws_ami.linux.id
    instance_type = "c3.xlarge"
    disable_api_stop = false
    disable_api_termination = false
    key_name = var.asg_key_name
    vpc_security_group_ids = var.asg_sg_id
    user_data = var.asg_user_data

    iam_instance_profile {
      arn = var.asg_iam_role
    }
}

resource "aws_autoscaling_group" "ecs_asg" {
    availability_zones = var.availability_zones
    capacity_rebalance = false
    name = var.asg_name
    default_instance_warmup = 0
    enabled_metrics = []
    max_size = 1
    min_size = 1
    health_check_grace_period = 0
    health_check_type = "EC2"
    desired_capacity = 1
    force_delete = true
    max_instance_lifetime = 0
    suspended_processes = []
    termination_policies = []

    launch_template {
        id = aws_launch_template.ecs_asg_template.id
        version = "$Latest"
    }
    tag {
        key                 = "AmazonECSManaged"
        value               = true
        propagate_at_launch = true
    }
    tag {
        key                 = "Name"
        propagate_at_launch = true
        value               = "ECS Instance - UR-Active-Cluster"
    }
}
resource "aws_ecs_capacity_provider" "ecs_service_provider" {
    name = var.capacity_provider

    auto_scaling_group_provider {
        auto_scaling_group_arn = aws_autoscaling_group.ecs_asg.arn
        managed_draining = "ENABLED"
        managed_termination_protection = "DISABLED"

        managed_scaling {
          instance_warmup_period = 300
          maximum_scaling_step_size = 10000
          minimum_scaling_step_size = 1
          status = "ENABLED"
          target_capacity = 100
        }
    }
}

resource "aws_ecs_service" "fyp-run" {
    name = "fyp-run"
    cluster = aws_ecs_cluster.ur_active_cluster.arn
    enable_ecs_managed_tags = true
    health_check_grace_period_seconds = 0
    task_definition = aws_ecs_task_definition.founding_pathers.arn
    desired_count = 1
    propagate_tags = "NONE"
    tags = {}
    tags_all = {}

    capacity_provider_strategy {
        base = 1
        capacity_provider = aws_ecs_capacity_provider.ecs_service_provider.name
        weight = 1
    }

    alarms {
        alarm_names = [ ]
        enable = false
        rollback = false
    }

    capacity_provider_strategy {
        base = 0
        capacity_provider = aws_ecs_capacity_provider.ecs_service_provider.name
        weight = 1
    }

    ordered_placement_strategy {
        field = "instanceId"
        type = "spread"
    }

    deployment_circuit_breaker {
        enable = true
        rollback = true
    }
    
    deployment_controller {
        type = "ECS"
    }

    ordered_placement_strategy {
        field = "attribute:ecs.availability-zone"
        type  = "spread"
    }
}


resource "aws_route53_record" "record_A" {
    zone_id = var.zone_id
    name = "ur-active.tech"
    type = "A"

    alias {
        evaluate_target_health = true
        name                   = var.a_records
        zone_id                = aws_alb.app_load_balancer.zone_id
        }
}

resource "aws_route53_record" "record_NS" {
    allow_overwrite = true
    zone_id = var.zone_id
    name = "ur-active.tech"
    type = "NS"
    ttl = "172800"

    records = var.ns_values
}

resource "aws_route53_record" "record_SOA" {
    zone_id = var.zone_id
    name = "ur-active.tech"
    type = "SOA"
    ttl = "900"

    records = [var.soa_values]
}

resource "aws_route53_record" "record_CNAME" {
    zone_id = var.zone_id
    name = var.cname_name
    type = "CNAME"
    ttl = "300"

    records = [ var.cname_values ]
}
