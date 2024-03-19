resource "aws_vpc" "FoundingPathersVPC" {
    cidr_block = var.cidr_block
    tags = {
        "Name" = "FoundingPathersVPC"
    }
    tags_all = {
        "Name" = "FoundingPathersVPC"
    }
}

resource "aws_s3_bucket" "lb_logs" {
    bucket = "founding-pathers-alb-logs"

}

resource "aws_alb" "app_load_balancer" {
    name = "founding-pathers-ALB"
    internal = false
    load_balancer_type = "application"
    security_groups = var.alb_security_group_values

    enable_deletion_protection = true

    access_logs {
        bucket = aws_s3_bucket.lb_logs.id
        prefix = "ur-active-lb"
        enabled = true
    }
    subnet_mapping {
        subnet_id = var.subnet1
    }
    subnet_mapping {
        subnet_id = var.subnet2
    }

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
    service_connect_defaults {
        namespace = var.ecs_namespace
    }
}

data "aws_ssm_parameter" "ecs_task_definition" {
    name = "/foundingpathers-task-revision-terraform.json"
}

data "aws_iam_policy" "ecs_task_execution" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_ecs_task_definition" "founding_pathers" {
    family = "foundingpathers-task"
    container_definitions = data.aws_ssm_parameter.ecs_task_definition.value
}

resource "aws_ecs_service" "fyp-run" {
    name = "fyp-run"
    cluster = aws_ecs_cluster.ur_active_cluster.arn
    iam_role = data.aws_iam_policy.ecs_task_execution.arn
    enable_ecs_managed_tags = true
    health_check_grace_period_seconds = 0
    task_definition = aws_ecs_task_definition.founding_pathers.arn
    desired_count = 1
    propagate_tags = "NONE"
    tags = {}
    tags_all = {}
    
    alarms {
        alarm_names = []
        enable = false
        rollback = false
    }

    capacity_provider_strategy {
        base = 1
        capacity_provider = var.capacity_provider
        weight = 1
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
    ordered_placement_strategy {
        field = "instanceId"
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
        zone_id                = var.alias_zone_id
        }
}

resource "aws_route53_record" "record_NS" {
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
