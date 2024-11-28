# Table: TrabajoOrdenesRecorridoPrueba

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkAñoOT | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumOT | int | NO |
| FechaRecorridoPruebaInicio | datetime | YES |
| FechaRecorridoPruebaFin | datetime | YES |
| FkEmpleados | smallint | YES |
| KmsInicio | int | YES |
| KmsFin | int | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkPruebaTipo | tinyint | YES |
| FkRecorridoTipo | tinyint | YES |
| FkRecorridoPruebaEstado | tinyint | YES |
| FkDocumentos | smallint | YES |
| FkDocumentosRespuestas | int | YES |
| PkTrabajoOrdenesRecorridoPrueba_Iden | int | NO |
