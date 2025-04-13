import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

args = getResolvedOptions(sys.argv, ['JOB_NAME'])

sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Read from Glue Catalog
datasource = glueContext.create_dynamic_frame.from_catalog(
    database="mini_data_lake",
    table_name="project0datapipelinestack_databuckete3889a50_jbpu3o2oupnw"
)

# Transformation: Make all names uppercase
transformed = datasource.map(lambda row: 
    row.update({"name": row["name"].upper()}) or row
)

# Write to S3
glueContext.write_dynamic_frame.from_options(
    frame=transformed,
    connection_type="s3",
    connection_options={"path": "s3://project0datapipelinestack-databuckete3889a50-jbpu3o2oupnw/output/"},
    format="csv"
)

job.commit()
