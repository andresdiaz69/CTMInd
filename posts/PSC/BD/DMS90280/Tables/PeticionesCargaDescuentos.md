# Table: PeticionesCargaDescuentos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPeticionesCargaDescuentos_Iden | smallint | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | NO |
| FkSecciones | int | YES |
| FkSeccionCargos | nvarchar | YES |
| FkCargoTipos | nvarchar | YES |
| Descuento | decimal | NO |
| FechaBaja | datetime | YES |
| FacturacionTipos | tinyint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
