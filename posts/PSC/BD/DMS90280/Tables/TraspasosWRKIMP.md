# Table: TraspasosWRKIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkTraspasosWRKIMP | bigint | NO |
| FkProcesos | int | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkSecciones | int | YES |
| FkCentros_Destino | smallint | YES |
| FkSecciones_Destino | int | YES |
| FkUbicaciones | nvarchar | YES |
| FkUbicaciones_Destino | nvarchar | YES |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| Unidades | decimal | YES |
| FkCausaTraspaso | smallint | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| OtrosDatos | nvarchar | YES |
