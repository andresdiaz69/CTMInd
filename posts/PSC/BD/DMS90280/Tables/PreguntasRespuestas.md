# Table: PreguntasRespuestas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkPreguntas | int | NO |
| PkPreguntasRespuestas_Iden | int | NO |
| FkRespuestasTipos | tinyint | NO |
| FkAccionesTipos | tinyint | YES |
| Descripcion | nvarchar | YES |
| Precarga | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| FkActividadesTipos | smallint | YES |
| FkActividadesDetTipos | smallint | YES |
| RechazoEnFactura | bit | YES |
| TextoFactura | nvarchar | YES |
| DiasProximaInspeccion | smallint | YES |
| FkPreguntas_Relacion | int | YES |
| FkPreguntasRespuestas_Relacion | int | YES |
| Imagen | nvarchar | YES |
