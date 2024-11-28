# Table: AnticiposProveedorImportado

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAnticiposProveedorImportado_Iden | bigint | NO |
| FkTerceros | int | YES |
| FechaAlta | datetime | YES |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
| Importe | decimal | YES |
| FkContCtas_Saldar | nvarchar | YES |
| FkPagoFormas | nvarchar | YES |
| Concepto | nvarchar | YES |
| Observaciones | nvarchar | YES |
| XmlEnvio | nvarchar | YES |
| FechaImportacion | datetime | YES |
| Depurada | bit | YES |
| FkAnticiposProveedor | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpleados | smallint | YES |
| UserAlta | smallint | YES |
| FkIntegracionesAnticipo | smallint | YES |
| Tipo | nvarchar | YES |
| FkRecibos | int | YES |
