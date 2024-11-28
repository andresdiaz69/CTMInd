# Table: CajasEmisionDocumentosDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCajas | smallint | NO |
| PkFkCajasDet | int | NO |
| PkCajasEmisionDocumentosDet_Iden | smallint | NO |
| FkAnticiposProveedor | int | YES |
| FkAnticiposProveedorAsientos | tinyint | YES |
| FkRecibos | int | YES |
| FkRecibosAsientos | tinyint | YES |
| FkPagoFormas | nvarchar | YES |
| FkContCtas_Contabilizacion | nvarchar | YES |
| FkCtaBancarias | smallint | YES |
| FkSeriesEmision | nvarchar | YES |
| NumEmision | nvarchar | YES |
| AñoEmision | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkContCtas_Tercero | nvarchar | YES |
| ImporteDocumento | decimal | YES |
| ImporteComision | decimal | YES |
| PorcInteres | decimal | YES |
| FkContCtas_Comision | nvarchar | YES |
