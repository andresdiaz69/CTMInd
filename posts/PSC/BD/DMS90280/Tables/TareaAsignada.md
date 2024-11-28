# Table: TareaAsignada

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkTareaAsignada_Iden | bigint | NO |
| FkSecciones | int | NO |
| FkEquipoPicaje | nvarchar | YES |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkAñoOT | nvarchar | YES |
| FkSeries | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| FkCitas | int | YES |
| FkCitasDet | smallint | YES |
| FechaInicio | datetime | YES |
| FechaFin | datetime | YES |
| Horas | decimal | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkManoObraTipos | smallint | YES |
