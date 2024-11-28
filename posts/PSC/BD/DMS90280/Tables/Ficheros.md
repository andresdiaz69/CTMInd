# Table: Ficheros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkModulos | nvarchar | NO |
| PkFkIntegracion | smallint | NO |
| PkFicheros_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| FkFicheroDiseñoTipos | smallint | NO |
| NLineasNoTratarArriba | smallint | NO |
| NLineasNoTratarAbajo | smallint | NO |
| NombreFichero | nvarchar | YES |
| FinLinea | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| CodificacionFichero | nvarchar | YES |
| ExistenPropagaciones | bit | NO |
| TamañoLinea | int | YES |
| PosicionesCOMP3 | nvarchar | YES |
| NumeroBytesLinea | int | YES |
| FechaMod | datetime | NO |
| DiasVigencia | smallint | YES |
| Generico | bit | NO |
