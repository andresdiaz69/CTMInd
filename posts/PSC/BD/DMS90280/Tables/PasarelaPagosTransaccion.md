# Table: PasarelaPagosTransaccion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTpvs | smallint | NO |
| PkPasarelaPagosTransaccion_Iden | int | NO |
| NumTransaccion | nvarchar | NO |
| Importe | decimal | NO |
| FkPasarelaPagoTipos | nvarchar | NO |
| Token | nvarchar | YES |
| FechaTransaccion | datetime | YES |
| FkPasarelaPagoEstados | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCentros | smallint | YES |
| FkCajas | smallint | YES |
| FkEmpleadoS | smallint | YES |
| FechaAnulacion | datetime | YES |
| Observaciones | nvarchar | YES |
| AdmiteDevolucion | bit | YES |
