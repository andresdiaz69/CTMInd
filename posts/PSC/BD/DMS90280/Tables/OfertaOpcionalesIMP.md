# Table: OfertaOpcionalesIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkOfertaOpcionalesIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkFicheros | smallint | YES |
| FkProcesos | int | YES |
| FkMarcas | smallint | YES |
| CodConcesionario | nvarchar | YES |
| FkOpcionales | nvarchar | YES |
| FkOpcionalTipos | nvarchar | YES |
| Descripcion | nvarchar | YES |
| PrecioVenta | decimal | YES |
| FkOfertasIMP | bigint | YES |
| NumLineaFichero | int | YES |
| OpcionalPinturaTipos | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Origen | nvarchar | YES |
| CodExternoOpcionales | nvarchar | YES |
| DeSerie | nvarchar | YES |
| DeConcesion | nvarchar | YES |
