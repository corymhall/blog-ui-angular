terraform {
  backend "s3" {
    bucket = "REPLACE_ME"
    key    = "terraform-angular.tfstate"
    region = "us-east-2"
  }
}
