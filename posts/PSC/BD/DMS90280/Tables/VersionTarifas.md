# Table: VersionTarifas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkFkGamas | smallint | NO |
| PkFkCodModelo | nvarchar | NO |
| PkFkExtModelo | nvarchar | NO |
| PkFkAñoModelo | nvarchar | NO |
| PkFkVersiones | nvarchar | NO |
| PkFkTarifas | smallint | NO |
| PrecioCompra | decimal | YES |
| PrecioVenta | decimal | YES |
| TransporteCompra | decimal | YES |
| TransporteVenta | decimal | YES |
| RodajeTrimestral | decimal | YES |
| IncluirEnListaPrecios | bit | NO |
| GastosMatriculacion | decimal | YES |
| Impuesto576Porc | decimal | YES |
| Atipicos | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| PrecioLegalizacion | decimal | YES |
| PrecioISV | decimal | YES |
| PrecioEcoValor | decimal | YES |
| PrecioLegalizacionVenta | decimal | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| PrecioSeguroObligatorio | decimal | YES |
| PrecioIUC | decimal | YES |
