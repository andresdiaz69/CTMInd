# Table: AlquilerFacturasPrestamos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkSeries_Factura | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkCentros_Prestamo | smallint | NO |
| PkFkVehiculos | int | NO |
| PkFkPrestamos | int | NO |
| Contrato | nvarchar | YES |
| Matricula | nvarchar | YES |
| Marca | nvarchar | YES |
| Gama | nvarchar | YES |
| FkAlquilerTarifas | smallint | YES |
| FechaDesde | datetime | YES |
| FechaHasta | datetime | YES |
| Importe_BI | decimal | YES |
| Importe_BNS | decimal | YES |
| Importe_BE | decimal | YES |
| FkImpuestos | nvarchar | YES |
| DescripcionImpuesto | nvarchar | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkPrestamoTiposInternos | smallint | NO |
| FkPrestamoTipos | smallint | NO |
| FkCentros_Imputacion | smallint | YES |
| FkDepartamentos_Imputacion | nvarchar | YES |
| FkSecciones_Imputacion | int | YES |
| FkEntidades | nvarchar | YES |
| FkAlquilerVehiculosGrupos | smallint | YES |
| FkCentros_ImputacionOrigen | smallint | YES |
| FkDepartamentos_ImputacionOrigen | nvarchar | YES |
| FkSecciones_ImputacionOrigen | int | YES |
| Importe_CosteTotal | decimal | YES |
| MesesTarifa | smallint | YES |
