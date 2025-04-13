# AWS Data Pipeline Project

This project demonstrates a simple AWS data pipeline using AWS CDK, S3, Glue, and Athena. 
The pipeline ingests a CSV file, catalogs it with Glue, transforms it using a Glue Job (PySpark), and saves the transformed output back to S3.

# Technologies Used

- AWS CDK (TypeScript) – Infrastructure as Code
- AWS S3 – Data storage
- AWS Glue – Data cataloging and ETL (Extract, Transform, Load)
- Amazon Athena – Querying the cataloged data

---

# Project Overview

- Created an AWS CDK project to define infrastructure.
- Provisioned an S3 bucket to hold input and output data.
- Uploaded a "sample_data.csv" file to the S3 bucket.
- Created a Glue database and crawler using CDK to catalog the CSV file into a table.
- Wrote a Glue ETL job using PySpark to:
  - Read data from the catalog
  - Transform the "name" field to uppercase
  - Write the transformed data back to a new "output/" folder in the S3 bucket
- Resolved S3 permission issues for the Glue job role
- Queried the final output using Amazon Athena