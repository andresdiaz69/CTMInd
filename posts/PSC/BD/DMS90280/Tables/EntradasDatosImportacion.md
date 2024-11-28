# Table: EntradasDatosImportacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkEntradasDatosImportacion | bigint | NO |
| NumEntradasAlbaran | nvarchar | YES |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| DescripcionReferencia | nvarchar | YES |
| Unidades | decimal | YES |
| PrecioCompra | decimal | YES |
| DtoPorcCompra | decimal | YES |
| PrecioVenta | decimal | YES |
| DtoPorcVenta | decimal | YES |
| NumOT | nvarchar | YES |
| NumPedido | nvarchar | YES |
| NombreArchivo | nvarchar | NO |
| ErrorImportacion | nvarchar | YES |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FkAñoEntradasAlbaran | nvarchar | YES |
| FkTerceros | int | YES |
| FkSeries_Entradas | nvarchar | YES |
| FkNumEntradasAlbaran | nvarchar | YES |
| FkEntradasDet | int | YES |
| FechaAlta | datetime | NO |
| FechaProcesado | datetime | YES |
| FechaDescartado | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
