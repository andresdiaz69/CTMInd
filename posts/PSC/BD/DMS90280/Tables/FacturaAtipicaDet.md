# Table: FacturaAtipicaDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFacturaAtipicaDet_Iden | int | NO |
| TipoBase | nvarchar | NO |
| ImporteBase | decimal | NO |
| FkContCtas_Debe | nvarchar | YES |
| FkContCtas_Haber | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| Referencia | nvarchar | YES |
| FkCtaBancarias | smallint | YES |
| FkConceptosBancarios | nvarchar | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| FkContCtas_Consolidacion | nvarchar | YES |
