# AWS Secure Static Website Hosting (Terraform)

This repository contains Terraform configurations to provision a secure, scalable, and high-performance static website hosting infrastructure on AWS. 

By leveraging Amazon CloudFront as a Content Delivery Network (CDN) with Origin Access Control (OAC), the underlying S3 origin bucket remains completely private, blocking all direct public access. This aligns with cloud security best practices (least-privilege access) while ensuring low-latency content delivery globally.

---

## Infrastructure Design & Key Components

### 1. Secure Storage (Amazon S3)
* **Private Access:** Direct public access to the S3 bucket is blocked (`aws_s3_bucket_public_access_block`) preventing accidental exposure.
* **Origin Access Control (OAC):** Instead of legacy Origin Access Identity (OAI), this configuration uses AWS OAC with SigV4 signing, allowing CloudFront to query the private S3 bucket securely.
* **Automated Asset Upload:** Static assets inside the `./www` directory are recursively read and uploaded to S3. Content-Type headers are dynamically evaluated using file extensions to ensure browsers render HTML, CSS, JavaScript, and images correctly.

### 2. Global Content Delivery (Amazon CloudFront)
* **Global Edge Network:** Serves cached assets from AWS edge locations to minimize latency for end-users.
* **Enforced Security:** Automatically redirects all HTTP traffic to HTTPS (`viewer_protocol_policy = "redirect-to-https"`).
* **Caching Control:** Optimized cache behaviors default to index.html as the root object, caching assets for up to 24 hours (`max_ttl = 86400`) and respecting standard GET/HEAD requests.

### 3. State Management (S3 Backend)
* **Remote State:** State files are persisted in a remote S3 bucket (`learning-terraform-asim-state-file`) in `ap-south-1`.
* **Native Lock Control:** Configured with S3 native locking (`use_lockfile = true`) to prevent concurrent executions and state corruption.

---

## Project Structure

```text
├── backend.tf                # Configures remote S3 backend state & S3 native lockfile
├── local.tf                  # Local values (e.g., origin_id)
├── main.tf                   # Primary resources (S3, CloudFront OAC, Bucket Policy, Objects)
├── output.tf                 # Output values (CloudFront URL, S3 Bucket details)
├── provider.tf               # Specifies AWS provider constraints (AWS Provider v6.x)
├── variables.tf              # Input variables (e.g., bucket name definitions)
├── www/                      # Root directory for static website source code
│   ├── index.html            # Main site markup
│   ├── style.css             # Main stylesheet
│   ├── script.js             # Client-side scripting
│   └── devops_hero.png       # Website graphic assets
```

---

## Deployment & Usage

### Prerequisites
* **AWS CLI:** Configured with active credentials having permissions to create IAM, S3, and CloudFront resources.
* **Terraform CLI:** Recommended version `1.10+` (required for native S3 backend locking).

### Step-by-Step Execution

1. **Initialize Backend & Provider:**
   Downloads the required AWS provider plug-in and sets up connection to the remote state bucket.
   ```bash
   terraform init
   ```

2. **Generate Dry-Run Plan:**
   Inspects the changes Terraform will apply to your AWS environment.
   ```bash
   terraform plan
   ```

3. **Deploy Infrastructure:**
   Applies the configurations to AWS and uploads the assets.
   ```bash
   terraform apply
   ```

4. **Access the Website:**
   After a successful apply, the terminal will output the CloudFront distribution domain name. Copy and paste this URL into your browser to view the active site.

---

## Technical Specifications

### Input Variables
| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| `bucket_name` | Name of the primary S3 bucket for website assets | `string` | `"static-website-asim-abbasi-s3-cloudfront"` | No |

### Output Parameters
| Name | Description |
|------|-------------|
| `cloudfront_domain_name` | The domain name of the CloudFront distribution to access the website |
| `s3_bucket_id` | The S3 bucket name created for asset hosting |
