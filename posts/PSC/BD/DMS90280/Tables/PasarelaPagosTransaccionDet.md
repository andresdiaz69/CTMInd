# Table: PasarelaPagosTransaccionDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTpvs | smallint | NO |
| PkFkPasarelaPagosTransaccion | int | NO |
| PkPasarelaPagosTransaccionDet_Iden | smallint | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FkEfectosNumDet | smallint | YES |
| FkRecibos | int | YES |
| Importe | decimal | YES |
| FkTarjetaTipos | nvarchar | YES |
| FkConceptosBancarios | nvarchar | YES |
| NumCuotasAplazadas | nvarchar | YES |
| VoucherTA | nvarchar | YES |
| FkPagoFormas | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkContCtas_Contabilizacion | nvarchar | YES |
| FkTerceros | int | YES |
