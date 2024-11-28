# Table: OfertaKitsManoObra

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkFkTallerKits | nvarchar | NO |
| PkOfertaKitsManoObra_Iden | int | NO |
| FkGamas | smallint | YES |
| FkCodModelo_Like | nvarchar | YES |
| FkExtModelo | nvarchar | YES |
| FkAñoModelo | nvarchar | YES |
| FkVersiones | nvarchar | YES |
| FkManoObraCodigos | nvarchar | YES |
| FkVariante | nvarchar | YES |
| Descripcion | nvarchar | NO |
| UT | int | NO |
| PrecioHora | decimal | NO |
| PorcDescuento | decimal | NO |
| FkManoObraTipos | smallint | YES |
| FechaBaja | datetime | YES |
| FkTarifas | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
