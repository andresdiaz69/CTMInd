# Table: Descargos_SolicitudDescargos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdDescargo | bigint | NO |
| IdEstado | smallint | NO |
| FechaSolicitud | datetime | NO |
| DescripcionHechos | nvarchar | NO |
| CodigoFalta | smallint | NO |
| CodigoSancion | smallint | YES |
| CartaSancionFirmada | bit | NO |
| SancionDefitiva | smallint | YES |
| CodSAI | bigint | YES |
