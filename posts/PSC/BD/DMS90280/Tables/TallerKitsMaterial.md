# Table: TallerKitsMaterial

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkFkTallerKits | nvarchar | NO |
| PkTallerKitMaterial_Iden | int | NO |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| Descripcion | nvarchar | NO |
| Precio | decimal | YES |
| PorcDescuento | decimal | YES |
| Unidades | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTarifas_Recambios | tinyint | NO |
