# Table: GastosImportacionCalculos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkGastosImportacionCalculos_Iden | int | NO |
| FkCompraGastoAdicionalTipos | nvarchar | NO |
| FkTipoBases | nvarchar | NO |
| NumOrden | smallint | NO |
| FechaAlta | datetime | NO |
| FkMarcas | smallint | NO |
| FkGamas | smallint | YES |
| FkCodModelo | nvarchar | YES |
| FkExtModelo | nvarchar | YES |
| FkAñoModelo | nvarchar | YES |
| FkVersiones | nvarchar | YES |
| FkPaises | nvarchar | YES |
| FkGastosImportacionBases | smallint | YES |
| Importe | decimal | YES |
| Porc | decimal | YES |
| CargarEnProcesoPrincipal | bit | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
