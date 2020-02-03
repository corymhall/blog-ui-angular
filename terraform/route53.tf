resource "aws_route53_zone" "blog" {
  name = "REPLACE_ME"
}

resource "aws_route53_record" "blog" {
  zone_id = "${aws_route53_zone.blog.zone_id}"
  name    = "REPLACE_ME"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.blog.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.blog.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_blog" {
  zone_id = "${aws_route53_zone.blog.zone_id}"
  name    = "REPLACE_ME"
  type    = "CNAME"
  ttl     = "300"

  records = [
    "REPLACE_ME",
  ]
}

resource "aws_acm_certificate" "cert" {
  domain_name = "REPLACE_ME"

  subject_alternative_names = [
    "REPLACE_ME",
  ]

  validation_method = "DNS"
}

resource "aws_route53_record" "cert_validation" {
  name    = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_name}"
  type    = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_type}"
  zone_id = "${aws_route53_zone.blog.zone_id}"
  records = ["${aws_acm_certificate.cert.domain_validation_options.0.resource_record_value}"]
  ttl     = 60
}

resource "aws_route53_record" "cert_validation_alt1" {
  name    = "${aws_acm_certificate.cert.domain_validation_options.1.resource_record_name}"
  type    = "${aws_acm_certificate.cert.domain_validation_options.1.resource_record_type}"
  zone_id = "${aws_route53_zone.blog.zone_id}"
  records = ["${aws_acm_certificate.cert.domain_validation_options.1.resource_record_value}"]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn = "${aws_acm_certificate.cert.arn}"

  validation_record_fqdns = [
    "${aws_route53_record.cert_validation.fqdn}",
    "${aws_route53_record.cert_validation_alt1.fqdn}",
  ]
}

resource "aws_acm_certificate" "cert_east1" {
  provider    = "aws.east1"
  domain_name = "REPLACE_ME"

  subject_alternative_names = [
    "REPLACE_ME",
  ]

  validation_method = "DNS"
}

resource "aws_route53_record" "cert_validation_east1" {
  provider = "aws.east1"
  name     = "${aws_acm_certificate.cert_east1.domain_validation_options.0.resource_record_name}"
  type     = "${aws_acm_certificate.cert_east1.domain_validation_options.0.resource_record_type}"
  zone_id  = "${aws_route53_zone.blog.zone_id}"
  records  = ["${aws_acm_certificate.cert_east1.domain_validation_options.0.resource_record_value}"]
  ttl      = 60
}

resource "aws_route53_record" "cert_validation_alt1_east1" {
  provider = "aws.east1"
  name     = "${aws_acm_certificate.cert_east1.domain_validation_options.1.resource_record_name}"
  type     = "${aws_acm_certificate.cert_east1.domain_validation_options.1.resource_record_type}"
  zone_id  = "${aws_route53_zone.blog.zone_id}"
  records  = ["${aws_acm_certificate.cert_east1.domain_validation_options.1.resource_record_value}"]
  ttl      = 60
}

resource "aws_acm_certificate_validation" "cert_east1" {
  provider        = "aws.east1"
  certificate_arn = "${aws_acm_certificate.cert_east1.arn}"

  validation_record_fqdns = [
    "${aws_route53_record.cert_validation_east1.fqdn}",
    "${aws_route53_record.cert_validation_alt1_east1.fqdn}",
  ]
}
