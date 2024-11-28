# Table: ProrrataImpuesto

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkProrrataImpuesto_Ejercicio | nvarchar | NO |
| PorcProvisional | decimal | NO |
| PorcDefinitiva | decimal | YES |
| DifMinRegBienesInversion | decimal | YES |
| AplicarTodasCompras | bit | NO |
| FkContCtas | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
