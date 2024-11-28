# Table: OfertaKitsVarios

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkFkTallerKits | nvarchar | NO |
| PkOfertaKitsVarios_Iden | int | NO |
| FkVariosCodigos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| PorcDescuento | decimal | NO |
| Unidades | decimal | NO |
| Precio | decimal | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
