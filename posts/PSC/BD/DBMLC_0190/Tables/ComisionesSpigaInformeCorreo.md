# Table: ComisionesSpigaInformeCorreo

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | YES |
| PkTerceros | int | NO |
| Tercero | nvarchar | NO |
| FechaNacimiento | date | YES |
| NumDocumento | nvarchar | YES |
| Poblacion | nvarchar | YES |
| Departamento | nvarchar | YES |
| Telefono | nvarchar | NO |
| Perfil | nvarchar | YES |
| Direccion | nvarchar | NO |
| Email | nvarchar | NO |
| CodTerceroConductor | int | YES |
| Conductor | nvarchar | YES |
| FechaVenta | date | YES |
| FechaEntrega | date | YES |
| CodTerceroFinanciera | int | YES |
| Financiera | nvarchar | YES |
| TipoFinanciacion | nvarchar | YES |
| TiempoFinanciacion | date | YES |
| TarjetaFidelizacion | nvarchar | YES |
| DescuentoMat | decimal | YES |
| DescuentoMatPintura | decimal | YES |
| DescuentoMO | decimal | YES |
| DescuentoTrabajosExternos | decimal | YES |
| DescuentoVarios | decimal | YES |
| FechaAltaDesde | datetime2 | YES |
| FechaAltaHasta | datetime2 | YES |
