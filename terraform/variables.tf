variable "organization" {
    type = string
}

variable "workspace_name" {
    type = string
}

variable "zone_id" {
    type = string
}

variable "alias_zone_id" {
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

variable "subnet1" {
    description = "Subnet 1"
    type = string
}

variable "subnet2" {
    description = "Subnet 2"
    type = string
}

variable "alb_security_group_values" {
    description = "security group values"
    type = list(string)
    }

variable "cidr_block" {
    description = "CIDR Block for VPC"
    type = string
}

variable "ecs_namespace" {
    description = "ECS namespace"
    type = string
}

variable "capacity_provider" {
    description = "ECS Capacity Provider"
    type = string
}