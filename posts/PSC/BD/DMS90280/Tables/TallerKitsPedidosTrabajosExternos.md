# Table: TallerKitsPedidosTrabajosExternos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkMarcas | smallint | NO |
| PkFkTallerKits | nvarchar | NO |
| PkTallerKitsPedidosTrabajosExternos_Iden | int | NO |
| FkCentros | smallint | NO |
| FkTerceros | int | NO |
| FKWFClasificaciones | nvarchar | NO |
| FkArticulosTipos | int | YES |
| FkArticulos | int | YES |
| Descripcion | nvarchar | YES |
| Unidades | decimal | NO |
| PrecioUnitario | decimal | NO |
| ImporteExento | decimal | YES |
| DtoPorc | decimal | YES |
| Observaciones | nvarchar | YES |
| FkImpuestos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
