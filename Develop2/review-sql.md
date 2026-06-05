# [東神開発] 契約開始日の初期値設定 SQL

## 概要

東神開発（org_code: `009`）の全テナントに対して、契約開始日（`contract_start_date`）として `2026-06-01` を設定する。

## 対象テーブル

`tenant_details`（テナント詳細情報）

- `contract_start_date` は `tenant_details` テーブルに存在する（`tenants` テーブルではない）
- `tenant_details` は論理削除テーブルのため、最新レコード（`archived_at IS NULL`）のみを対象にする
- すでに `contract_start_date` が設定済みのテナントは上書きしない（`contract_start_date IS NULL` を条件に追加）

## 関連 issue

[#3546](https://github.com/supsysjp/boba-admin/issues/3546)

---

## 事前確認クエリ

実行前に対象件数と現在の値を確認する。

```sql
SELECT
  t.id         AS tenant_id,
  t.name       AS tenant_name,
  s.name       AS store_name,
  td.id        AS tenant_detail_id,
  td.contract_start_date,
  td.contract_end_date
FROM tenant_details td
JOIN tenants t ON t.id = td.tenant_id
JOIN stores s  ON s.id = t.store_id
JOIN organizations o ON o.id = s.organization_id
WHERE o.code = '009'
  AND td.archived_at IS NULL
  AND td.contract_start_date IS NULL
ORDER BY s.name, t.name;
```

---

## 更新クエリ

```sql
UPDATE tenant_details td
SET
  contract_start_date = '2026-06-01',
  updated_at          = NOW()
FROM tenants t
JOIN stores s  ON s.id = t.store_id
JOIN organizations o ON o.id = s.organization_id
WHERE td.tenant_id = t.id
  AND o.code = '009'
  AND td.archived_at IS NULL
  AND td.contract_start_date IS NULL;
```

---

## 事後確認クエリ

更新後に意図通り反映されているかを確認する。

```sql
SELECT
  t.id         AS tenant_id,
  t.name       AS tenant_name,
  s.name       AS store_name,
  td.contract_start_date,
  td.contract_end_date,
  td.updated_at
FROM tenant_details td
JOIN tenants t ON t.id = td.tenant_id
JOIN stores s  ON s.id = t.store_id
JOIN organizations o ON o.id = s.organization_id
WHERE o.code = '009'
  AND td.archived_at IS NULL
ORDER BY s.name, t.name;
```

---

## 注意事項

- 本SQLはステージング環境で動作確認してから本番に適用すること
- `contract_start_date` がすでに設定されているテナントは変更しない（`IS NULL` 条件で保護）
- `contract_end_date` は今回設定しない（issueの要件外）
- 適用後、boba-app 上で `2026-06-01` より前の売上日が選択できなくなることを確認すること
