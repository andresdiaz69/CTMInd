# Table: RelacionesEntreCtasTerceros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkContCtas_Origen | nvarchar | NO |
| PkRelacionesEntreCtasTerceros_Iden | smallint | NO |
| FkSubtiposClientes | nvarchar | YES |
| FkContCtas_Destino | nvarchar | YES |
| NumDiasVencimiento | int | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
