# Table: spiga_ContabilidadMovimientos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | NO |
| NombreEmpresa | nvarchar | YES |
| Cuenta | nvarchar | YES |
| CodigoTercero | int | YES |
| FechaAsiento | datetime | YES |
| NumeroAsiento | int | YES |
| Factura | nvarchar | YES |
| FechaFactura | datetime | YES |
| TipoFactura | nvarchar | YES |
| ReferenciaInterna | nvarchar | YES |
| Debe | decimal | YES |
| Haber | decimal | YES |
| concepto | nvarchar | YES |
| FacturaConciliacion | nvarchar | YES |
| ExpedienteConciliacion | nvarchar | YES |
| Centro | nvarchar | YES |
| NombreCentro | nvarchar | YES |
| Seccion | int | YES |
| NombreSeccion | nvarchar | YES |
| Departamento | nvarchar | YES |
| NombreDepartamento | nvarchar | YES |
| IdCtaBancarias | smallint | YES |
| CuentaBancaria | nvarchar | YES |
| Marca | smallint | YES |
| NombreMarca | nvarchar | YES |
| centroAux | nvarchar | YES |
| NombreCentroAux | nvarchar | YES |
| SeccionAux | int | YES |
| NombreSeccionAux | nvarchar | YES |
| DepartamentoAux | nvarchar | YES |
| NombreDepartamentoAux | nvarchar | YES |
| referencia | nvarchar | YES |
| TipoAsiento | nvarchar | YES |
