# Table: ErrorRevisionTrabajosIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkErrorRevisionTrabajosIMP | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| ModeloTaller | nvarchar | YES |
| VIN | nvarchar | YES |
| Operacion | nvarchar | YES |
| Kmts | int | YES |
| Taller | nvarchar | YES |
| NumOrden | nvarchar | YES |
| FechaRevision | datetime | YES |
| AvisoRecibido | bit | YES |
| Matricula | nvarchar | YES |
| CodigoError | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| KmReales | int | YES |
| Concesionario | nvarchar | YES |
| ValorMO | decimal | YES |
| ValorPiezas | decimal | YES |
| ValorDiversos | decimal | YES |
| NumPedido | nvarchar | YES |
| FechaPedido | datetime | YES |
| EstadoRevision | nvarchar | YES |
