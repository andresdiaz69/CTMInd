# Table: _LaFloresta_Mig_AnticiposProveedor

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAnticiposProveedor_Iden | int | NO |
| FkTerceros | int | NO |
| Fecha | datetime | NO |
| Importe | numeric | NO |
| FkReciboEstados | nvarchar | NO |
| FkEmpleados | smallint | YES |
| FkPagoFormas | nvarchar | NO |
| Concepto | nvarchar | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | numeric | YES |
| FactorCambioMonedaContravalor | numeric | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpleados_Emision | smallint | YES |
| Abonado | bit | NO |
| FkTalones | int | YES |
| FkTalonesDetalles | tinyint | YES |
| UserAlta | smallint | NO |
| FkContCtas_AnticipoImportado | nvarchar | YES |
| FkCentros | smallint | YES |
