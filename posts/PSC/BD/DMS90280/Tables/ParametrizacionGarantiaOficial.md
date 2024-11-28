# Table: ParametrizacionGarantiaOficial

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkMarcas | smallint | NO |
| PkFkGamas | smallint | NO |
| PkParametrizacionGarantiaOficial_Iden | smallint | NO |
| FkCodModelo | nvarchar | YES |
| FkExtModelo | nvarchar | YES |
| FkAñoModelo | nvarchar | YES |
| FkVersiones | nvarchar | YES |
| MascaraVIN | nvarchar | NO |
| MesesGarantiaMecanica | tinyint | YES |
| MesesGarantiaMotor | tinyint | YES |
| MesesGarantiaChapa | tinyint | YES |
| MesesGarantiaPintura | tinyint | YES |
| KilometrosGarantia | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
