# Table: FacturasIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFacturasIMP | bigint | NO |
| FkProcesos | int | NO |
| NumFactura | nvarchar | YES |
| FechaFactura | datetime | YES |
| TotalFactura | decimal | YES |
| BaseImponibleFactura | decimal | YES |
| OtrosDatos | nvarchar | YES |
| FkNumEntradasAlbaran | nvarchar | YES |
| FkNumDet | int | YES |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| DescripcionReferencia | nvarchar | YES |
| Unidades | decimal | YES |
| PrecioEntrada | decimal | YES |
| DtoPorc | decimal | YES |
| TotalDetalle | decimal | YES |
| OtrosDatos2 | nvarchar | YES |
| DescripcionImpuesto | nvarchar | YES |
| EsIVA | bit | YES |
| PorcentajeImpuesto | decimal | YES |
| ImporteImpuesto | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| CodConcesionarioRE | nvarchar | YES |
| FkTerceros | int | YES |
| SerieFactura | nvarchar | YES |
| OtrosDatos3 | nvarchar | YES |
| OtrosDatos4 | nvarchar | YES |
| OtrosDatos5 | nvarchar | YES |
| OtrosDatos6 | nvarchar | YES |
| OtrosDatos7 | nvarchar | YES |
| OtrosDatos8 | nvarchar | YES |
| OtrosDatos9 | nvarchar | YES |
| OtrosDatos10 | nvarchar | YES |
| CodProveedor | nvarchar | YES |
| FkMonedas | smallint | YES |
| BaseExentaFactura | decimal | YES |
| OtrosDatos11 | nvarchar | YES |
| OtrosDatos12 | nvarchar | YES |
| OtrosDatos13 | nvarchar | YES |
| OtrosDatos14 | nvarchar | YES |
