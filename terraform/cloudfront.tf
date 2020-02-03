resource "aws_cloudfront_origin_access_identity" "blog" {
  comment = "Pleasant Places Blog Origin Access Identity"
}

resource "aws_cloudfront_distribution" "blog" {
  origin {
    domain_name = "${aws_s3_bucket.blog.bucket_regional_domain_name}"
    origin_id   = "blog_s3_origin"

    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.blog.cloudfront_access_identity_path}"
    }
  }

  enabled             = true
  default_root_object = "index.html"

  aliases = ["REPLACE_ME", "REPLACE_ME"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "blog_s3_origin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = "${aws_acm_certificate_validation.cert_east1.certificate_arn}"
    minimum_protocol_version = "TLSv1.2_2018"
    ssl_support_method       = "sni-only"
  }
}
