# Table: PedidosServiciosPlantillas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkPedidosServiciosPlantillas_Iden | smallint | NO |
| FkTallerKits | nvarchar | YES |
| FkPedidosServiciosOperacionTipos | nvarchar | NO |
| FkMarcas | smallint | NO |
| FkCentros_Origen | smallint | NO |
| FkSecciones_Origen | int | NO |
| FkCentros_Cargo | smallint | NO |
| FkDepartamentos_Cargo | nvarchar | NO |
| FkSecciones_Cargo | int | NO |
| FkImputacionTipos | smallint | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
