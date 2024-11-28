# Table: CajasDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkCajasDet_Iden | int | NO |
| FkEmpleados | smallint | NO |
| FkCajaAcciones | smallint | NO |
| Fecha | datetime | NO |
| Concepto | nvarchar | YES |
| Importe | decimal | NO |
| Contabilizado | bit | NO |
| FkVales | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| ImporteTalon | decimal | NO |
| FechaMod | datetime | NO |
| FkConceptosBancarios | nvarchar | YES |
| FactorCambioMoneda | decimal | YES |
| FkMonedas | smallint | YES |
| ImporteTimbre | decimal | YES |
| FkImpuestos_Timbre | nvarchar | YES |
