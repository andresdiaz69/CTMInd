# Table: web_estado_procesos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| spID | smallint | NO |
| keyID | smallint | NO |
| cod_proc | char | NO |
| nom_usu | nvarchar | NO |
| por_ava | smallint | YES |
| fec_ini | datetime | NO |
| fec_fin | datetime | YES |
| des_proc | nvarchar | NO |
| men_ale | xml | YES |
| res_proc | xml | YES |
| ind_cancel | bit | NO |
