terraform {
  backend "s3" {
    bucket       = "learning-terraform-asim-state-file"
    key          = "dev/terraform.tfstate"
    region       = "ap-south-1"
    encrypt      = true
    use_lockfile = true # Native S3 locking
  }
}
