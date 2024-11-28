# Table: PasarelaPagosVinculaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTpvs | smallint | NO |
| PkFkPasarelaPagosTransaccion | int | NO |
| PkFkPasarelaPagosTransaccionDet | smallint | NO |
| PkPasarelaPagosVinculaciones_Iden | smallint | NO |
| FkRecibos | int | YES |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FkEfectosNumDet | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Importe | decimal | YES |
| FkReciboEstadosAnterior | nvarchar | YES |
