# Table: OfertasVOSeguros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertasVO | smallint | NO |
| PkOfertasVOSeguros_Iden | smallint | NO |
| FkSeguroTipos | nvarchar | NO |
| FkTerceros | int | NO |
| FechaAlta | datetime | NO |
| FechaVencimiento | datetime | YES |
| Importe | decimal | NO |
| ImporteFranquicia | decimal | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| ImporteComisionVenta | decimal | YES |
