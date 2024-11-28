# Table: ComprobantesElectronicosEfectos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkComprobantesElectronicos | int | NO |
| PkComprobantesElectronicosEfectos_Iden | smallint | NO |
| FkEmpresas | smallint | YES |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FkEfectosNumDet | smallint | YES |
| Importe | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
