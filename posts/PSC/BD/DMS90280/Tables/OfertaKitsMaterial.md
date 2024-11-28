# Table: OfertaKitsMaterial

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkFkClientesPotEntradas | smallint | NO |
| PkFkOfertas | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkFkTallerKits | nvarchar | NO |
| PkOfertaKitsMaterial_Iden | int | NO |
| FkGamas | smallint | YES |
| FkCodModelo_Like | nvarchar | YES |
| FkExtModelo | nvarchar | YES |
| FkAñoModelo | nvarchar | YES |
| FkVersiones | nvarchar | YES |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| Descripcion | nvarchar | NO |
| Precio | decimal | NO |
| PorcDescuento | decimal | NO |
| FkManoObraTipos | smallint | YES |
| FechaBaja | datetime | YES |
| Unidades | decimal | NO |
| FkTarifas | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTarifas_Recambios | tinyint | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
