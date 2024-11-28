# Table: VentaTiposBeneficios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkVentaTipos | nvarchar | NO |
| PkFkCompraTipos | nvarchar | NO |
| PkVentaTiposBeneficios_Iden | smallint | NO |
| ImporteDesde | decimal | NO |
| ImporteHasta | decimal | NO |
| BeneficioPorc | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
