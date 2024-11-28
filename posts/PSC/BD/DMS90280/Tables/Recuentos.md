# Table: Recuentos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkRecuentos | bigint | NO |
| FkCentros | smallint | NO |
| FkSecciones | int | NO |
| FkUbicaciones | nvarchar | NO |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| FechaAlta | datetime | NO |
| StockInicial | decimal | NO |
| Unidades | decimal | NO |
| FechaProcesado | datetime | YES |
| FkEmpleados_Procesado | smallint | YES |
| FkDispositivos | nvarchar | YES |
| FkEmpleados_Recuento | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| UnidadesRecogidas | decimal | NO |
