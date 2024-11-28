# Table: FacturacionDescripcionesProforma

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoFacturaProforma | nvarchar | NO |
| PkFkSeries_Proforma | nvarchar | NO |
| PkFkNumFacturaProforma | nvarchar | NO |
| Cliente_Factura | nvarchar | YES |
| Cliente | nvarchar | YES |
| DescripcionImpuesto | nvarchar | YES |
| DescripcionPagoFormaTipos | nvarchar | YES |
| DescripcionCentroDestino | nvarchar | YES |
| DescripcionSeccionCargoInterno | nvarchar | YES |
| DescripcionDepartamentoCargoInterno | nvarchar | YES |
| DescripcionImputacion | nvarchar | YES |
| NumeroRegistroIndustrial | nvarchar | YES |
| ObservacionesFactura | nvarchar | YES |
| FkTextoSistema_IRM | int | YES |
| FkTextoSistema_LPD | int | YES |
| FkTextoSistema_MG | int | YES |
| FkTextoSistema_OFA | int | YES |
| FkTextoSistema_PF | int | YES |
| NombreMarca | nvarchar | YES |
| NombreModelo | nvarchar | YES |
| NumeroRegistroEspecial | nvarchar | YES |
| Direccion | nvarchar | YES |
| TextoControlVisual | nvarchar | YES |
| PruebaRecorridoVisible | bit | NO |
| NumeroCuentaBancarioEmpresa | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkResumenTipos | tinyint | YES |
