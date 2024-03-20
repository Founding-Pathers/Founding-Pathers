variable "zone_id" {
    type = string
}

variable "a_records" {
    type = string
}

variable "ns_values" {
    type = list(string)
}

variable "soa_values" {
    type = string
}

variable "cname_values" {
    type = string
}

variable "cname_name" {
    type = string
}

variable "subnet_values" {
    description = "Subnet IDs"
    type = list(string)
}

variable "alb_security_group_values" {
    description = "security group values"
    type = list(string)
    }

variable "cidr_block" {
    description = "CIDR Block for VPC"
    type = string
}

variable "capacity_provider" {
    description = "ECS Capacity Provider"
    type = string
}

variable "asg_name" {
    description = "Auto-scaling Group"
    type = string
}

variable "availability_zones" {
    description = "AZ for ASG"
    type = list(string)
}

variable "ecs_iam_arn" {
    description = "IAM ARN for ECS"
    type = string
}

variable "ecs_cpu" {
    description = "ECS CPU"
    type = number
}

variable "ecs_memory" {
    description = "ECS Memory"
    type = number
}

variable "asg_key_name" {
    description = "ASG Key Name"
    type = string
}

variable "asg_sg_id" {
    description = "Security Group for ASG"
    type = list(string)
}

variable "asg_iam_role" {
    description = "ASG IAM Role"
    type = string
}

variable "asg_user_data" {
    description = "ASG User Data"
    type = string
}