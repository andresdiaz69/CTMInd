# Table: ImportadoraMarcas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkImportadoras | int | NO |
| PkFkMarcas | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ClaseTrabajoGarantia | nvarchar | YES |
| CampañasVN_CalcularSobrePrecioBase | bit | NO |
| CampañasVN_CalcularSobrePrecioPintura | bit | NO |
| CampañasVN_CalcularSobrePrecioOpcionales | bit | NO |
| CampañasVN_CalcularSobreCompra | bit | NO |
| CampañasVN_CalcularSobrePrecioTransporte | bit | NO |
| CampañasVN_DescuentosAplicables | nvarchar | YES |
| RebootGAR | bit | NO |
| NumeroCombos | tinyint | YES |
| Region | nvarchar | YES |
| PermitirCambioTarifa | bit | NO |
| PedidoEventosHistorico | bit | NO |
| PermitirCambiarUtGarantia | bit | NO |
| AgruparTodasLasMarcas | bit | NO |
| NumeracionGarantiaImportadora | bit | NO |
| PermitirReclamarReferenciasNoOficiales | bit | NO |
| PermitirReclamarTrabajosExternos | bit | NO |
| PermitirReclamarVarios | bit | NO |
| PermitirReclamarMaterialesPintura | bit | NO |
| PreciosAutomaticosPortal | bit | NO |
| DatosBasicosGarantia | bit | NO |
| TrabajaPrecioAnticipoGastos | bit | YES |
| ChequeaOpcionalesVenta | bit | YES |
