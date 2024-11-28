# Table: ConceptosTalones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkConceptosTalones_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| RequiereRecibo | bit | NO |
| RequiereAnticipo | bit | NO |
| FkContCtas | nvarchar | YES |
| FkConceptosBancarios | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| FkCentros_Desglose | smallint | YES |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FkManoObraTipos | smallint | YES |
| FkVentaCanales | nvarchar | YES |
| FkCompraCanales | nvarchar | YES |
| FkTarifas | tinyint | YES |
| ConceptoSaldar | bit | NO |
| FkCtaBancarias | smallint | YES |
