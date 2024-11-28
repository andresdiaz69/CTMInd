# Table: ExaIndices

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| database_id | smallint | YES |
| object_id | int | NO |
| index_id | int | NO |
| partition_number | int | NO |
| index_type_desc | nvarchar | YES |
| alloc_unit_type_desc | nvarchar | YES |
| index_depth | tinyint | YES |
| index_level | tinyint | NO |
| avg_fragmentation_in_percent | decimal | YES |
| fragment_count | bigint | YES |
| avg_fragment_size_in_pages | decimal | YES |
| page_count | bigint | YES |
| avg_page_space_used_in_percent | decimal | YES |
| record_count | bigint | YES |
| ghost_record_count | bigint | YES |
| version_ghost_record_count | bigint | YES |
| min_record_size_in_bytes | int | YES |
| max_record_size_in_bytes | int | YES |
| avg_record_size_in_bytes | decimal | YES |
| forwarded_record_count | bigint | YES |
| pfrgC | decimal | YES |
| pfrgO | decimal | YES |
| stati | tinyint | YES |
| tabla | nvarchar | YES |
| tipo | char | YES |
| NFGroup | nvarchar | YES |
| fase | char | NO |
| IndexName | nvarchar | YES |
| type | tinyint | YES |
| spage | bigint | YES |
| spageavg | decimal | YES |
