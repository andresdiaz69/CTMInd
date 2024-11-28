# Table: AlquilerConceptos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAlquilerConceptos_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| FkAlquilerConceptosInternos | tinyint | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| Precarga | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| BI | bit | NO |
| BE | bit | NO |
| BNS | bit | NO |
| Financiacion | bit | NO |
| UnidadMedida | nvarchar | YES |
| ServicioIncluido | bit | NO |
| SoloCoste | bit | NO |
| FkContCtas_Debe | nvarchar | YES |
| FkContCtas_Haber | nvarchar | YES |
